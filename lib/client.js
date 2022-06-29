import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "tuswsfbh",
    dataset: "production",
    apiVersion: "2022-06-24",
    useCdn: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);