import menuList from "./reducers";
import { getMenuList, addMenu, updateMenu, removeMenu } from "./actions";
//在可能用到的reducer中全部引入,在全部暴露出去,目的:引用起来更方便
export { menuList, getMenuList, addMenu, updateMenu, removeMenu };
