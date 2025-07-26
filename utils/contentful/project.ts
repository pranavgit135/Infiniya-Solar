import fetchGraphQL from "./graphQL";

const PROJECT_QUERY = `
  heroImage{
  url
  }
  title1
  title2
  description
  right-col-title
  right-col-description1
  right-col-description2

  solarProjectsCollection{
  items{
  ... on SolarProjects{
    id
    name
    capacity
    location
    image{
    url
    }
    description
    type
  }}}
    statTitle
    statDescription

        `



export async function getProjectPage() {
  const data = (await fetchGraphQL(`
    query {
        projectPageCollection(limit:1) {
            items {
                  heroImage{
  url
  }
  title1
  title2
  description
  
 solarProjectsCollection{
  items{
  ... on SolarProjects{
    id
    name
    capacity
    location
    image{
    url
    }
    description
    type
  }}}
    statTitle
    statDescription
  
  }}}
    `)) 

    
  return data?.data?.projectPageCollection?.items?.[0];
}
