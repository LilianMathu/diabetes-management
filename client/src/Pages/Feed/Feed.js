import Avatar from "../../Components/Avatar/Avatar";
import "./feed.scss";

const Feed = () => {
  return (
    <div className="feed">
      {/* date */}
      <div className="feed_date">
        <Avatar />
        <p>1st October 2022</p>
      </div>

      {/* image */}
      <div className="feed_image">
        <img src="https://source.unsplash.com/random" alt="feed_image" />
      </div>
      {/* content */}
      <div className="feed_content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos commodi
          quod explicabo, dicta aliquam rem tenetur quis culpa voluptatum sequi
          molestiae voluptas iusto dolorem earum.
        </p>
      </div>
    </div>
  );
};

export default Feed;
