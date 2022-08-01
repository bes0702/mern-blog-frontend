import React from "react";
import { useParams } from 'react-router-dom';
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from '../axios';
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const { id } = useParams();

  const [post, setPost] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then((res)=> {
      setPost(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получении статьи');
    });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost={true}/>
  }
  
  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        //imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        imageUrl={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : null}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        tags={post.tags}
        isFullPost
      >
        <p>{post.text}</p>
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
