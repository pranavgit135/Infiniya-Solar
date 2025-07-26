import fetchGraphQL from "./graphQL";

const Contact_QUERY = `
  heroImage{url}
  customerTitle1
  customerTitle2
  customerDescription
  loactionTitle
  locationText1
  locationText2
  locationText3
  lboxText4
  locationPhone
  locationUrl
  customerlogoSectionCollection{
  items{
  ... on CustomerLogoSection{
     id
     name
     image{
     url}
     } }}
  
  
`;



export async function getContactPage() {
  const data = (await fetchGraphQL(`
    query {
        contactPageCollection(limit:${1}) {
            items {
                  ${Contact_QUERY}
        }
    }
  }
    `)) 
 
    

  return data?.data?.contactPageCollection?.items?.[0];
}
