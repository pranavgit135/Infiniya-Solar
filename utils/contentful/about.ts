import fetchGraphQL from "./graphQL";

const ABOUT_QUERY = `
  title
  heroSection {
        ... on AboutHeroSection {
        heading1
        heading2
        subheading
        description
        buttonText
        image {
          url
        }
}}
  contactSection {
           ... on AboutContactCtaSection {
        headline
        subtext
        ctaText
      }
        }
        videoSectionCollection {
    items {
      ... on AboutVideoSection {
        title
        description
        videoUrl
        posterImage {
          url
        }
        posterTitle
        posterdescription
      }
    }
  }
      infoCardsCollection{
        items {
        ... on AboutInfoCard{
          title
          description
}}}
            journeySectionCollection {
            items{
            ... on JourneySection{
        year
        title
        description
        position
        }
        }
        }

        cultureSectionCollection {
        items{
        ... on AboutCultureSection{
        iconame {
          url
        }
        title
        description
        }
      }
    }

          workLifeBalanceSectionCollection {
          items{
          ... on AboutWorkLifeBalanceSection{
        image {
          url
        }
        title
        description
        fullTitle
        awardedBy
        awardedDate
        criteria
        achievement
        quote
      }
        }
      }
`;



export async function getAboutPage() {
  const data = (await fetchGraphQL(`
    query {
        aboutPageCollection(limit:${1}) {
            items {
                  ${ABOUT_QUERY}
        }
    }
  }
    `)) 

  return data?.data?.aboutPageCollection?.items?.[0];
}
