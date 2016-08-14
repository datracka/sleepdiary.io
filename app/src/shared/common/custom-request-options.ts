import {RequestOptions} from "http";
import {contentHeaders} from "./headers";

export let requestOptions = new RequestOptions({
    body: '',
    headers: contentHeaders,
});