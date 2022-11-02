export default function HeaderIcon({ Icon, title }) {
  return (
    <div className="mx-4 flex flex-col cursor-pointer hover:text-gray-400 lg:mx-6">
      <Icon className="h-8" />
      <p>{title}</p>
    </div>
  );
}
