import Header from '~/components/header.js'

export default function FindPage() {
  return (
    <>
      <Header />
      <h1>Find</h1>

      <div className="container mx-auto">
        {/* Create a component of TOP 5 best place to visite  */}
        <div className="flex flex-wrap -mx-2">
          <div className="m-4 w-full md:w-1/2 lg:w-1/3 px-2">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">1. Paris</h2>
              <p>Paris is the capital of France.</p>
            </div>
          </div>
          <div className="m-4 w-full md:w-1/2 lg:w-1/3 px-2">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">2. London</h2>
              <p>London is the capital of England.</p>
            </div>
          </div>
          <div className="m-4 w-full md:w-1/2 lg:w-1/3 px-2">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">3. Tokyo</h2>
              <p>Tokyo is the capital of Japan.</p>
            </div>
          </div>
          <div className="m-4 w-full md:w-1/2 lg:w-1/3 px-2">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">4. New York</h2>
              <p>New York is the capital of USA.</p>
            </div>
          </div>
          <div className="m-4 w-full md:w-1/2 lg:w-1/3 px-2">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">5. Sydney</h2>
              <p>Sydney is the capital of Australia.</p>
            </div>
          </div>
        </div>
      </div>

      <label htmlFor="ramp">Ramp</label>
      <input name="ramp" type="checkbox" id="ramp" />
    </>
  )
}
