function TransactionBox({ title, content }) {
  return (
    <div className="pt-6 p-3 md:p-3 md:text-left">
      <div className="font-bold text-lg">
        <div className="text-slate-700 dark:text-slate-800">{title}</div>
      </div>
      <div className="text-lg font-medium break-all">{content}</div>
    </div>
  );
}

export default TransactionBox;
