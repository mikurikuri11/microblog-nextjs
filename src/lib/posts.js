import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    }
  });
  return allPostsData;
}

// getStaticPathのreturnで使うidの配列を返す
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      }
    }
  });
}

// idに基づいてブログのデータを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  // gray-matterを使ってメタデータ部分を解析する
  const matterResult = matter(fileContents);

  const blogContent = await remark().use(html).process(matterResult.content);
  const contentHtml = blogContent.toString();

  // データをidと合わせる
  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}