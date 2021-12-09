
const query = `
query {

  coalitionCollection(limit: 2) {
    items {
      orgCollection(limit:30) {
        items {
         name
          link
          img {
            url
          }
        }
      }
      __typename
      introParagraph
      cityRacesCollection(limit: 11) {
        items {
          __typename
          ... on CandidateRace {
            title
            officialCollection(limit: 11) {
              items {
                name
                endorsed
              }
            }
          }
        }
      }
      __typename
      countyRacesCollection(limit: 11) {
        items {
          __typename
          ... on CountyElected {
            name
            position
          }
            
        }
      }
    }
  }

  spanish:sectionCollection(locale: "es", limit: 2 ) {
    items {
      title
      basicField
      	{
          json
          links {
            entries {
              block {
                sys {
                  id
                }
                
                __typename
                ... on EffectsGrid {
                  intro
                  effectsCollection(limit: 30) {
                    items {
                        __typename
                      ... on Effect {
                        content
                        pillar
                        source
                      }
                    }
                  }
                }

                __typename
               	 ... on AllocationBucket {
                   allocationsCollection(limit: 10) {
                    items {
                      __typename
                      ... on Allocation {
                        title
                        image {
                             url
                            title
                            description
                        }
                        shortContent {
                          json
                        }
                        acres
                      }
                  }
                }
                }
                __typename
                ... on CustomBlock {
                  name
                }
                __typename
                ... on PullQuote {
                  quote
                  link
              	}
                __typename
                ... on SubParagraph {
                  richText {
                    json
                  }
                  name
                }
                __typename
                ... on Goals {
                  healthy {
                    json
                  }
                  accessability{
                    json
                  }
                  climate{
                    json
                  }
                  productivity{
                    json
                  }
                  measurables{
                    json
                  }
              	}
              }
            }
            assets {
              block {
                sys {
                  id
                }
                contentfulMetadata {
                  tags {
                    name
                  }
                }
                url
                title
                description
              }
            }
          }
        }
    }
	}

	english:sectionCollection(locale: "en-US", limit: 2) {
    items {
      title
      basicField
      	{
          json
          links {
            entries {
              block {
                sys {
                  id
                }
                
                __typename
                ... on EffectsGrid {
                  intro
                  effectsCollection(limit: 30) {
                    items {
                        __typename
                      ... on Effect {
                        content
                        pillar
                        source
                      }
                    }
                  }
                }

                __typename
               	 ... on AllocationBucket {
                   allocationsCollection(limit: 10) {
                    items {
                      __typename
                      ... on Allocation {
                        title
                        image {
                             url
                            title
                            description
                        }
                        shortContent {
                          json
                        }
                        acres
                      }
                  }
                }
                }
                __typename
                ... on CustomBlock {
                  name
                }
                 __typename
                ... on SubParagraph {
                  name
                  richText {
                    json
                  }
                  name
                }
                __typename
                ... on PullQuote {
                  quote
                  link
              	}
                __typename
                ... on Goals {
                  healthy {
                    json
                  }
                  accessability{
                    json
                  }
                  climate{
                    json
                  }
                  productivity{
                    json
                  }
                  measurables{
                    json
                  }
              	}
              }
            }
            assets {
              block {
                sys {
                  id
                }
                contentfulMetadata {
                  tags {
                    name
                  }
                }
                url
                title
                description
              }
            }
          }
        }
    }
  }
}
`

export default query