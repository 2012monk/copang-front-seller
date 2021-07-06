import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/member/1">장바구니</Link>
                </li>
                <li>
                    <Link to="/member/2">판매자 상품등록</Link>
                </li>
                <li>
                    <Link to="/member/3">리덕스 Example</Link>
                </li>
                <li>
                    <Link to="/member/4">상품 리스트</Link>
                </li>
                <li>
                    <Link to="/member/5">마이 페이지</Link>
                </li>
                <li>
                    <Link to="/member/6">Test</Link>
                </li>
                <li>
                    <Link to="/member/7">Test2</Link>
                </li>
            </ul>
            <hr/>
        </div>
    )
}

export default Menu;