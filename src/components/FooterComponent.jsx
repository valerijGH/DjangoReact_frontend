const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-8">
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-sm">© Токарев Валерий Сергеевич</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-white">
              РИ-230931
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterComponent;
