import React from 'react'

const questionList = [
    'What skills do I need for a data analyst role?',
    'How do I switch career to UX design?'
]

function EmptyState({selectedQuestion}: any) {
  return (
    <div>
        <h2 className='font-bold text-xl text-center'>Ask Anything to Career AI Agent.</h2>
        <div>
            {questionList.map((question, index) => (
                <h2 className='p-4 text-center border rounded-lg my-3 hover:border-primary cursor'
                key={index}
                onClick={()=>selectedQuestion(question)}>{question}</h2>
            ))}
        </div>
    </div>
  )
}

export default EmptyState