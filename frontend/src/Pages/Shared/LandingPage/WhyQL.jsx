import { FaBus } from "react-icons/fa"

const WhyQL = () => {
    return (
        <section>
              <div className="container mx-auto pb-14 pt-16 text-center">
       {/* Section Title */}
<div className="container">
<h1 className="text-4xl font-bold pb-10 border-b-2 border-secondary inline-block py-4 mb-8 dark:text-secondary">
 --- Why QuizLoom?? ---
</h1>
{/* card section */}
<div>
    <div className="grid grid-cols-2 md:grid-cols-4
    gap-14 sm:gap-4">
        {/* 1st card */}
        <div className="text-center flex 
        justify-center items-center flex-col gap-2
        px-2">
            <h1 className="text-xl text-dark/90 font-bold">Personalized learning</h1>
        <p className="text-dark/70 ">Students practice at their own pace,
         first filling in gaps
         in their understanding and then 
         accelerating their learning.

        </p>
        <p className="text-5xl rotate-90
         text-primary text-center translate-x-5" >
            ....
            </p>
      <FaBus className="text-5xl 
      text-primary" />
        </div>
{/* 2nd card */}
<div className="text-center flex 
        justify-center items-center flex-col gap-1
        px-3">
             <FaBus className="text-5xl 
      text-secondary" />
       <p className="text-5xl rotate-90
         text-secondary text-center translate-x-5" >
            ....
            </p>
            <h1 className="text-xl text-dark/90 font-bold">Trusted content</h1>
            <p className="text-dark/70 ">Created by experts, 
            library of trusted practice and lessons covers math, science, and more. 
            Always free for learners and teachers.</p>
       
     
        </div>
 {/* 3rd card */}
 <div className="text-center flex 
        justify-center items-center flex-col gap-2
        px-2">
           <h1 className=" text-xl text-dark/90 font-bold">Tools to empower teachers</h1>
        <p className="text-dark/70 ">Teachers can identify gaps in their students’ understanding, 
        tailor instruction, 
        and meet the needs of every student.

        </p>
        <p className="text-5xl rotate-90
         text-primary text-center translate-x-5" >
            ....
            </p>
      <FaBus className="text-5xl 
      text-primary" />
        </div>

{/* 2nd card */}
<div className="text-center flex 
        justify-center items-center flex-col gap-1
        px-3">
             <FaBus className="text-5xl 
      text-secondary" />
       <p className="text-5xl rotate-90
         text-secondary text-center translate-x-5" >
            ....
            </p>
            <h1 className="text-xl text-dark/90 font-bold">Time Saving</h1>
            <p className="text-dark/70 ">Automates quiz creation, grading,
             and reporting, saving valuable time.</p>
       
     
        </div>

        


    </div>
</div>
</div>
</div>
        </section>
    )
}

export default WhyQL;