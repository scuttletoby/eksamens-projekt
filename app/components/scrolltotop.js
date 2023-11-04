export default function ScrollToTop() {

    function handleScroll() {
        document.documentElement.scrollTop = 0;
    }

    return (
        <button onClick={handleScroll} className="scroll-smooth fixed flex items-center justify-center w-10 h-10 bg-bgColor rounded-md shadow-md bottom-[2rem] right-[2rem]">
            <i className="text-black fas fa-arrow-up"></i>
        </button>
    )
}