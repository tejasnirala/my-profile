// Same share card as the home page; a page that sets its own `openGraph` drops the
// root one, so each route re-exports it.
export { default, alt, size, contentType } from "../opengraph-image";
