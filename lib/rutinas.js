import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rutinasDirectory = path.join(process.cwd(), "src/pages/api/data/rutinas");

export function getAllRutinasIds() {
  const fileNames = fs.readdirSync(rutinasDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx?$/, ""),
      },
    };
  });
}

export function getRutinasData(id) {
  const fullPath = path.join(rutinasDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  };
}
