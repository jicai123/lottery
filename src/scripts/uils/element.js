import Vue from "vue";
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Divider,
  Table,
  TableColumn,
  Message,
  Link,
  Card,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Pagination,
  Tabs,
  TabPane,
  MessageBox,
  Dialog,
  Popover,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  Alert,
  DatePicker,
} from "element-ui";

Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Divider);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.use(Card);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Pagination);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(Popover);

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Loading.directive);
Vue.use(Alert);
Vue.use(DatePicker);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;