import Image from "next/image";

export default function Home() {
  return (
    <>
      <header></header>
      <main className="p-3 border-b-slate-950 border-2 rounded-lg">
        <form action="">
          <div className="mb-4">
            <label htmlFor="">Text to translate</label>
            <textarea
              id="textToTranslate"
              name="textToTranslate"
              rows="5"
              cols="50"
              className="border rounded-lg p-2"
              placeholder="Enter your text here..."
            ></textarea>
            <label htmlFor="">Select language</label>
          </div>

          <div className="mb-4">
            <fieldset>
              <legend>Select a language</legend>
              <div className="flex gap-4">
                <div>
                  <input
                    type="radio"
                    id="french"
                    name="language"
                    value="french"
                  />
                  <label htmlFor="french">French</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="spanish"
                    name="language"
                    value="spanish"
                  />
                  <label htmlFor="spanish">Spanish</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="japanese"
                    name="language"
                    value="japanese"
                  />
                  <label htmlFor="japanese">Japanese</label>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
      </main>
    </>
  );
}
