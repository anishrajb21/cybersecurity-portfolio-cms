function AdminForm({
  fields,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="
      bg-[#0f172a]
      border
      border-gray-800
      p-8
      rounded-3xl
      space-y-6
      "
    >

      {fields.map((field, index) => (
        <div key={index}>

          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="
              w-full
              bg-[#1e293b]
              p-4
              rounded-xl
              outline-none
              h-40
              "
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="
              w-full
              bg-[#1e293b]
              p-4
              rounded-xl
              outline-none
              "
            />
          )}

        </div>
      ))}

      <button
        type="submit"
        className="
        bg-green-400
        text-black
        px-8
        py-4
        rounded-2xl
        font-bold
        hover:scale-105
        transition
        "
      >
        {buttonText}
      </button>

    </form>
  );
}

export default AdminForm;