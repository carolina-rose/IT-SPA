import $ from "jquery";
import { header } from "./components/header";
import { navigation } from "./navigation";
import { main } from "../src/components/main";

const body = $(document.body);
const head = $("header");

body.append(header());
head.append(navigation());
body.append(main());
