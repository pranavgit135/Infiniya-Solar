import fetchGraphQL from "./graphQL";

const HOME_QUERY = `
  title
  description
  btnText
  heroImage{
  url
    }
   
     keyStatSection{
    
     ... on KeyStateSection{
     title1
     title2
     description
     buttonText
     stats
         
     }
     }  
     
     industrialGrowth{
     ... on IndustrialGrowth{
     title
     subTitle
     description1
     description2
     lboxText1
     lboxText2
     lboxText3
     rboxText1
     rboxText2
     rboxText3
     buttonText

     }
     }

     renewableEnergyBenefitsSection{
     ... on RenewableEnergySection{
     title1
     title2
     image{
     url}
     imageTitle
     imageDescription
     benefits
     }
     }

     whyPartnerSectionCollection{
     items{
     ... on WhyPartnerSection{
     id
     title
     description
     image{
     url
     }
     }
     }
     }

     consultationSectionCollection{
     items{
     ... on ConsultationSectiion{
     id
     title
     icon{
     url
     }
     description
     }
     }
     }

     costomerLogoDescription

     customerlogoSectionCollection{
     items{
     ... on CustomerLogoSection{
     id
     name
     image{
     url}
     }}
     }

     testimonialsSectionCollection{
     items{
     ... on TestimonialSection{
     id
     name 
     designation
     company
     rating
     videoId
     photoUrl{
     url
     }
     thambnailUrl{
     url}
     duration
     year
     }}}

     partnersDescription
     partnerLogoSectionCollection{
     items{
     ... on PartnersLogoSection{
     id
     name
     image{
     url}
     }}}

     finalctaSection{
     ... on FinalCtaSection{
     title
     description
     btn1
     btn2
     }}

     mapSectionCollection{
     items{
     ... on MapSection{
     id
     name
     capacity
     projects
     }}}
        `



export async function getHomePage() {
  const data = (await fetchGraphQL(`
    query {
        homePageCollection(limit:${1}) {
            items {
                  ${HOME_QUERY}
        }
    }
  }
    `)) 
  
   
    
  return data?.data?.homePageCollection?.items?.[0];
}
