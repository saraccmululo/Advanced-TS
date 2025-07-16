import { ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type ApiDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as ApiDataBlogPost[];
        //converting the received api data to the object format we will use:
        const blogPosts: BlogPost[] = data.map((apiPost) => {
          return {
            id: apiPost.id,
            title: apiPost.title,
            text: apiPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        if(error instanceof Error){
          setError(error.message);
        }
        //setError('Failed to fecth posts')//that's a simpler alternative.
      }
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (isFetching) {
    content = <p id="loading-fallback"> Loading posts...</p>;
  }
  if(error){
    content=<ErrorMessage text={error} />;
  }
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return (
    <main>
      <img
        src={fetchingImg}
        alt="An abstract image depicting a data fetching process."
      />
      {content}
    </main>
  );
}

export default App;
