import StorySingleCard from "./StorySingleCard";


const StoriesCard = ({ stories }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {stories.map((item) => (
        <StorySingleCard key={item._id} story={item} />
      ))}
    </div>
  );
};

export default StoriesCard;
