function AdminCard({
  item,
  imageKey,
  titleKey,
  descriptionKey,
  deleteHandler,
}) {
  return (
    <div
      className="
      bg-[#0f172a]
      border
      border-gray-800
      rounded-3xl
      overflow-hidden
      "
    >

      {item[imageKey] && (
        <img
          src={item[imageKey]}
          alt=""
          className="
          w-full
          h-64
          object-cover
          "
        />
      )}

      <div className="p-8">

        <h2 className="text-3xl font-bold mb-4">
          {item[titleKey]}
        </h2>

        <p className="text-gray-400 mb-6">
          {item[descriptionKey]}
        </p>

        <div className="flex gap-4">

          <button
            className="
            bg-yellow-500
            px-6
            py-3
            rounded-xl
            font-bold
            "
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteHandler(item._id)
            }
            className="
            bg-red-500
            px-6
            py-3
            rounded-xl
            font-bold
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminCard;