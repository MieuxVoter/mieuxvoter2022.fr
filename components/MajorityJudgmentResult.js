import Image from 'next/image'


export const GRADES = [
  {name: "Excellent", color: "darkgreen", value: 7},
  {name: "Très bien", color: "green", value: 6},
  {name: "Bien", color: "olive", value: 5},
  {name: "Assez bien", color: "yellow", value: 4},
  {name: "Passable", color: "orange", value: 3},
  {name: "Insuffisant", color: "red", value: 2},
  {name: "À rejeter", color: "brown", value: 1},
]

const ProponentGrades = ({grades, majorityGrade, threshold, accBefore, proponentMajority, numVotes}) => (<>{accBefore > 0 ? (
  <div className={`proponents ${proponentMajority ? 'majority' : ''}`} style={{'flex-basis': `${accBefore / numVotes * 100 - 0.5}%`}}>
    {GRADES.map((grade, index) => {
      if (grade.value <= majorityGrade.value) {
        return null;
      }
      const className = `${grade.color} bar result`
      const width = `${grades[index] * 100 * numVotes / accBefore}%`
      const textWidth = Math.round(100 * grades[index])

      return (
        <div className={className} key={index} style={{flexBasis: width}}>
          {
            grades[index] < threshold ? (
              <span
                className={`outgauge ${index % 2 ? 'above' : 'below'}`}
                style={{
                  left: `${(grades[index] * 100) / 2
                    }%`,
                }}
              >
                {textWidth}%
              </span>
            ) : (
              <span>
                {Math.floor(100 * grades[index])}%
              </span>
            )
          }
        </div>)
    }
    )}
  </div>
) : null}</>)

const MajorityGrade = ({grades, majorityGrade, threshold}) => (<>
  {
    GRADES.map((grade, index) => {
      if (grade.value !== majorityGrade.value) {
        return null;
      }
      const className = `${grade.color} bar result majoritygrade`
      const width = `${grades[index] * 100 - 0.1}%`
      const textWidth = Math.floor(100 * grades[index])

      return (
        <div className={className} key={index} style={{flexBasis: width}}>
          {
            grades[index] < threshold ? (
              <span
                className={`outgauge ${index % 2 ? 'above' : 'below'}`}
                style={{
                  left: `${(grades[index] * 100) / 2
                    }%`,
                }}
              >
                {textWidth}%
              </span>
            ) : (
              <span>
                {Math.floor(100 * grades[index])}%
              </span>
            )
          }
        </div>)
    }
    )
  } </>)

const Result = ({name, image, grades}) => {
  /**
   * name: candidate name
   * grades: list of grades ordered from best to worst.
   */
  const numVotes = grades.reduce((a, b) => a + b, 0)
  const normalized = grades.map(m => m / numVotes)

  // find the majority grade
  let majorityGrade = GRADES[0]
  let accAfter = 0
  let accBefore = 0
  let isAfter = false
  let isBefore = true
  for (const gradeId in grades) {
    if (isBefore) {
      accBefore += grades[gradeId]
    }
    if (isAfter) {
      accAfter += grades[gradeId]
    }
    if (isBefore && accBefore > numVotes / 2) {
      majorityGrade = GRADES[gradeId]
      accBefore -= grades[gradeId]
      isBefore = false
      isAfter = true
    }
  }
  // 

  // is proponent higher than opposant?
  const proponentMajority = accAfter < accBefore;

  // for mobile phone, we outgauge earlier than on desktop
  const outgaugeThreshold = (typeof window !== 'undefined' && window.innerWidth <= 760) ? 0.05 : 0.03;

  return (
    <div className='mj'>
      <div className='ui card fluid mj'>
        <div className='ui content'>
          <div className='ui header'>
            <div className='ui image'>
              <Image src={image} alt={name} />
            </div>
          </div>

          <div className='ui details'>
            <div className='ui title'>
              <h3 className='ui header'>{name}</h3>
              <div className={`ui large ${majorityGrade.color} label`}>
                {majorityGrade.name}
              </div>
            </div>
            <div className='bar-row'>
              <ProponentGrades
                grades={normalized}
                threshold={outgaugeThreshold}
                majorityGrade={majorityGrade}
                proponentMajority={proponentMajority}
                accBefore={accBefore}
                numVotes={numVotes}
              />
              <MajorityGrade grades={normalized} threshold={outgaugeThreshold} majorityGrade={majorityGrade} />
              {accAfter > 0 ? (
                <div className={`opponents ${proponentMajority ? '' : 'majority'}`} style={{'flex-basis': `${accAfter / numVotes * 100}%`}}>
                  {GRADES.map((grade, index) => {
                    if (grade.value >= majorityGrade.value) {
                      return null;
                    }
                    if (grade.value == 0)
                      console.log(grade, index)


                    const className = `${grade.color} bar result ${majorityGrade.value === grade.value ? 'majoritygrade' : ''}`
                    const width = `${normalized[index] * 100 * numVotes / accAfter}%`
                    const textWidth = Math.floor(100 * normalized[index])

                    return (
                      <div className={className} key={index} style={{flexBasis: width}}>
                        {
                          normalized[index] < outgaugeThreshold ? (
                            <span
                              className={`outgauge ${index % 2 ? 'above' : 'below'}`}
                              style={{
                                left: `${(normalized[index] * 100) / 2
                                  }%`,
                              }}
                            >
                              {textWidth}%
                            </span>
                          ) : (
                            <span>
                              {Math.floor(100 * normalized[index])}%
                            </span>
                          )
                        }
                      </div>)
                  }
                  )}
                </div>) : null}
            </div>
            <div className='median dash'> </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Result;
