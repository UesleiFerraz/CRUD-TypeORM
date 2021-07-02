import "reflect-metadata";
import App from "./core/presentation/App";

const port = 3000;

App.init().then(_ => App.start(port));
