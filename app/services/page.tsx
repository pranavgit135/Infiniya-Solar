
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
const iconMap: { [key: string]: React.ElementType }={CheckCircle, Zap, Shield, Users, Award, ArrowRight }
import { CheckCircle, Zap, Shield, Users, Award, ArrowRight } from "lucide-react"
import FinalCTASection from "@/components/final-cta-section"
import { getHomePage } from "@/utils/contentful/home"
import SolarSolution from "@/components/service/SolarSolution"
import { getServicePage } from "@/utils/contentful/service"


export default async function ServicesPage() {
const data = await getHomePage()
const content = await getServicePage()
console.log(content);



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={content.heroImage.url}
          alt="Solar panel facility with industrial building"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            {content.heroBatch}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {content.heroTitle1}
            <span className="block text-[#f47920]">{content.heroTitle2}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          {content.herodescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#f47920] hover:bg-[#f47920] text-white">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Right Solution Section
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-orange-500">Right Solution:</span>
                <br />
                <span className="text-[#1e3a6e]">Selecting the Best Renewable Energy Strategy</span>
              </h2>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                  <p>Strategy Visualization</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-8">We help you with:</h3>

              <div className="grid gap-4">
                <div className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-orange-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2 text-lg">Technology Selection</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Analyze Solar, Wind, Hybrid, or Storage by studying load profiles and matching with generation
                        patterns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2 text-lg">Solution Selection</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Choosing between Onsite (Rooftop, Ground Mount, Car Parking) vs. Offsite (Intrastate,
                        Interstate) solutions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2 text-lg">Financial Structuring</h4>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        Deciding between comprehensive financing models:
                      </p>
                      <ol>
                        <li className="text-gray-600">OnSite Solution</li>
                        <li className="text-gray-600">OffSite Solution</li>
                      </ol>
                      
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2 text-lg">Regulatory Review</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Study state & central regulations, analyze trends, and anticipate risks as corporates often face
                        late regulatory roadblocks, causing delays.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-indigo-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                      <Award className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2 text-lg">25-Year Financial Model</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Project a detailed cash flow for 25 years, ensuring corporates have realistic view of cost
                        savings and risks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
       {/* Dynamic Solution Sections */}
       {content.solutionSectionCollection.items.map((section:any, index:number) => (
        <section key={section.id} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-orange-500">{section.title}:</span>
                  <br />
                  <span className="text-[#1e3a6e]">{section.subTitle}</span>
                </h2>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={section.image.url}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <h3 className="text-2xl font-semibold text-gray-700 mb-8">{section.helpText}</h3>

                <div className="grid gap-4">
                  {section.servicesCollection.items.map((service:any, serviceIndex:number) => {
                    const Icon = iconMap[service.icon];
                    return(
                      
                    <div
                      key={serviceIndex}
                      className={`group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-${service.color}-200`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 bg-${service.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${service.color}-200 transition-colors`}
                        >
                          <Icon className={`w-6 h-6 text-${service.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2 text-lg">{service.title}</h4>
                          <p className="text-gray-600 leading-relaxed mb-3">{service.description}</p>
                          {service.list && (
                            <ol className="list-decimal list-inside text-gray-600 space-y-1">
                              {service.list.map((item:string, itemIndex:number) => (
                                <li key={itemIndex}>{item}</li>
                              ))}
                            </ol>
                          )}
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <SolarSolution/>

      
      <FinalCTASection data={data}/>

     
    </div>
  )
}
