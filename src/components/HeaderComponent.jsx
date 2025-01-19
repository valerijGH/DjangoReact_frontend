


const HeaderComponent = () => {
   // const { isAuthorized } = useSelector((state) => state.auth);
   // const dispatch = useDispatch();
   //  useEffect(() => {
   //      dispatch(checkAuth());
   //  }, [dispatch]);
    return (
    <header className="flex items-center justify-between shadow-md py-4 px-8 bg-white">
      <div className="font-bold text-lg text-center">Java разработчик</div>
        {/*<div className="lg:flex space-x-4">*/}
        {/*    /!*{!isAuthorized ? (*!/*/}
        {/*    /!*    <>*!/*/}
        {/*    /!*        <Link*!/*/}
        {/*    /!*            to="/login"*!/*/}
        {/*    /!*            className="px-4 py-2 text-sm font-bold text-gray-500 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-all">*!/*/}
        {/*    /!*            Login*!/*/}
        {/*    /!*        </Link>*!/*/}
        {/*    /!*        <Link*!/*/}
        {/*    /!*            to="/register"*!/*/}
        {/*    /!*            className="px-4 py-2 text-sm font-bold text-white bg-blue-500 border-2 border-blue-500 rounded-full hover:bg-transparent hover:text-blue-500 transition-all">*!/*/}
        {/*    /!*            Sign up*!/*/}
        {/*    /!*        </Link>*!/*/}
        {/*    /!*    </>*!/*/}
        {/*    /!*) : (*!/*/}
        {/*    /!*    <button*!/*/}
        {/*    /!*        onClick={() => dispatch(logout())}*!/*/}
        {/*    /!*        // onClick={() => AuthService.logout()}*!/*/}
        {/*    /!*        className="px-4 py-2 text-sm font-bold text-white bg-blue-500 border-2 border-blue-500 rounded-full hover:bg-transparent hover:text-blue-500 transition-all">*!/*/}
        {/*    /!*        Logout*!/*/}
        {/*    /!*    </button>*!/*/}
        {/*    /!*)}*!/*/}
        {/*</div>*/}

    </header>
    );
};

export default HeaderComponent;
