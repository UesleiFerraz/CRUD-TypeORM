import "reflect-metadata";
import App from "./core/presentation/App";

const port = process.env.PORT || 3000;

App.init().then(() => App.start(Number(process.env.PORT) || 3000));
