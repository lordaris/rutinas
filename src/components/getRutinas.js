import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { readdirSync } from "fs";
import { join } from "path";
import remarkSlug from "remark-slug";
import remarkGfm from "remark-gfm";

const rutinasDirectory = path.join(
  process.cwd(),
  "./src/pages/api/data/rutinasold"
);

export async function getRutinas() {
  const rutinaFileNames = readdirSync(rutinasDirectory);
  const rutinas = await Promise.all(
    rutinaFileNames.map(async (fileName) => {
      const fullPath = join(rutinasDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const options = {
        remarkPlugins: [remarkSlug, remarkGfm],
        // Aquí puedes agregar más plugins de remark según tus necesidades
        // Consulta la documentación de remark para ver las opciones disponibles
      };
      const mdxSource = await serialize(content, { scope: data, ...options });
      return {
        fileName,
        data,
        mdxSource,
      };
    })
  );
  return rutinas;
}
