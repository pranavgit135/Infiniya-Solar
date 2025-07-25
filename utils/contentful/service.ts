import fetchGraphQL from "./graphQL";

const SERVICE_QUERY = `
 
  onsideSolutionTitle
  onsideSolutionDescription
  heroBatch
  heroTitle1
  heroTitle2
  herodescription
  heroImage{
  url
  }
  solutionSectionCollection{
  items {
  ... on ServiceSolutionSection{
  id
  title
  subTitle
  image{
  url
  }
  helpText
  servicesCollection{
  items{
  ... on Services{
  title
  description
  icon 
  color
  }}}
  }}}
`;



export async function getServicePage() {
  const data = (await fetchGraphQL(`
    query {
        servicePageCollection(limit:${1}) {
            items {
                  ${SERVICE_QUERY}
        }
    }
  }
    `)) 
    console.log(data);
    

  return data?.data?.servicePageCollection?.items?.[0];
}
