const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(__dirname, "..", "content", "equipment");
const OUTPUT_DIR = path.join(__dirname, "..", "src", "lib");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "equipment-data.json");

function parseTags(raw) {
  return {
    activity: raw.activity || [],
    function: raw.function || [],
    context: raw.context || [],
    technology: raw.technology || [],
    characteristics: raw.characteristics || [],
    productionStage: raw.productionStage || [],
  };
}

function parseContent(body) {
  const sections = {};
  const headings = body.split(/^## /m).slice(1);

  for (const section of headings) {
    const lines = section.split("\n");
    const title = lines[0].trim().toLowerCase();
    const content = lines.slice(1).join("\n").trim();

    if (title.includes("una frase")) sections.oneLiner = content;
    else if (title.includes("para qué sirve")) sections.whatFor = content;
    else if (title.includes("cuándo") || title.includes("cuando"))
      sections.whenToUse = content;
    else if (title.includes("necesit")) sections.whatYouNeed = content;
    else if (title.includes("consejo")) sections.quickTip = content;
  }

  return {
    oneLiner: sections.oneLiner || "",
    whatFor: sections.whatFor || "",
    whenToUse: sections.whenToUse || "",
    whatYouNeed: sections.whatYouNeed || "",
    quickTip: sections.quickTip || "",
  };
}

function main() {
  const categories = fs.readdirSync(CONTENT_DIR);
  const allEquipment = [];

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      const equipment = {
        id: data.id || file.replace(".md", ""),
        name: data.name || "",
        brand: data.brand || "",
        model: data.model || "",
        category: data.category || category,
        subcategory: data.subcategory || "camera",
        aliases: data.aliases || [],
        tags: parseTags(data.tags || {}),
        skillLevel: data.skillLevel || ["beginner"],
        useCases: data.useCases || [],
        requires: data.requires || [],
        recommendedWith: data.recommendedWith || [],
        compatibleWith: data.compatibleWith || [],
        alternatives: data.alternatives || [],
        notSuitableFor: data.notSuitableFor || [],
        image: data.image || "",
        status: data.status || "available",
        content: parseContent(content),
      };

      allEquipment.push(equipment);
      console.log(`✓ ${equipment.id} (${equipment.status})`);
    }
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allEquipment, null, 2));
  console.log(`\n✅ Generated ${allEquipment.length} equipment entries → ${OUTPUT_FILE}`);
}

main();
