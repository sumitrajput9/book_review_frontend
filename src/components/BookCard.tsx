const BookCard = ({ title, author, image, genre }: any) => {
  return (
    <div className="shadow-md rounded-md p-4 w-full max-w-sm">
      <img src={`http://localhost:5000/uploads/${image}`} alt={title} className="w-full h-52 object-cover rounded" />
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-gray-600">{author}</p>
      <p className="text-sm text-blue-500">{genre}</p>
    </div>
  );
};

export default BookCard;
