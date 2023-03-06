const Input = ({
  width,
  className,
  name,
  type,
  value,
  id,
  onChange,
  tittle,
  classNameLabel,
  placeholder,
  maxLength
}) => {
  return (
    <div className={width}>
      <label
        htmlFor="email"
        className={classNameLabel ? classNameLabel : "text-md md:text-xl font-medium"}
      >
        {tittle}
      </label>
      <input
        type={type ? type : "text"}
        name={name}
        value={value}
        id={id}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        className={className ? className : 'border-2 rounded-lg py-2 px-5 mt-1 w-full text-md md:text-xl focus:border-[#EFC81A] focus:shadow-xl hover:border-[#EFC81A] hover:shadow-xl outline-none'}
      />
    </div>
  );
};

export default Input;
