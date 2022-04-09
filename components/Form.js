import {useState} from 'react'
import Link from 'next/link'
import ErrorToast from './Toast'
import Message from './Message'
import {candidates} from '../lib/constants'


const Field = ({type, text, options, onChange, name}) => {
  if (type == 'mail') {
    return (<div className='row'>
      <h3>{text}</h3>
      <div className='ui input'>
        <input type="email" data-name={name} data-type={type} onChange={onChange} name={name} />
      </div>
    </div>)
  } else if (type == 'text') {
    return (<div className='row'>
      <h3>{text}</h3>
      <div className='ui input'>
        <input type="text" data-name={name} data-type={type} onChange={onChange} name={name} />
      </div>
    </div>)
  } else if (type == 'radio') {
    return (
      <div className='row'>
        <h3>{text}</h3>
        <div className="grouped fields">
          {options.map((opt, i) => (
            <div className="field" key={i}>
              <div className="ui radio checkbox">
                <input type="radio" onChange={onChange} data-type={type} data-name={name} data-value={opt} value={opt} name={name} /><label>{opt}</label>
              </div>
            </div>
          ))}
        </div>
      </div>)
  } else {
    throw 'Not implemented'
  }
}

const Form = ({onSubmit}) => {
  const [data, setData] = useState({
    error: undefined,
    loading: false,
    mail: "",
    age: "",
    zipCode: "",
    gender: "",
    csp: "",
    parti: "",
    terms: false,
  })
  const [error, setError] = useState();

  const check = () => {
    // TODO: check carefully each field is OK
    console.log(data)
    return true
  }

  const handleChange = (e) => {
    let {name, value, type} = e.target.dataset
    if (type == 'mail' || type == 'text') {
      value = e.target.value;
    }
    setData(prevData => ({...prevData, [name]: value}))
  }

  const handleSubmit = () => {
    if (!check()) {
      setError('Une option est invalide !')
      const timer = setTimeout(() => {
        setError(undefined);
      }, 3000);
      return
    }

    onSubmit({
      mail: data.mail,
      age: data.age,
      gender: data.gender,
      zipCode: data.zipCode,
      csp: '',
      terms: false,
    })
  }

  const optionsCSP = [
    "Les agriculteurs exploitants",
    "Les artisans, commerçants et chefs d'entreprise",
    "Les cadres et professions intellectuelles supérieures",
    "Les professions intermédiaires",
    "Les employés",
    "Les ouvriers",
    "Les retraités",
    "Autres personnes sans activité professionnelle",
  ]

  const optionsAge = [
    "Moins de 18 ans",
    "18 - 24 ans",
    "25 - 34 ans",
    "35 - 49 ans",
    "50 - 64 ans",
    "65 ans et plus",
  ]

  const optionsParti = candidates.map(c => c.parti)
  optionsParti.push('Sans préférence partisane')


  const fields = [
    {
      text: 'Quelle est votre tranche d\'âge ?',
      type: 'radio',
      options: optionsAge,
      name: 'age',
    },
    {
      text: 'Quelle est votre catégorie socio-professionnelle ?',
      type: 'radio',
      options: optionsCSP,
      name: 'csp',
    },
    {
      text: 'Quel est votre genre ?',
      type: 'radio',
      options: ['Homme', 'Femme'],
      name: 'gender',
    },
    {
      text: 'Vous venez de voter au scrutin par jugement majoritaire. A l’avenir, seriez-vous favorable ou défavorable à l’application de ce mode de scrutin pour l’élection présidentielle en France?',
      type: 'radio',
      options: ['Tout-à-fait favorable', 'Plutôt favorable', 'Plutôt défavorable', 'Tout-à-fait défavorable'],
      name: 'appreciation',
    },
    {
      text: 'Quel est votre code postal',
      type: 'text',
      name: 'zipCode',
    },
    {
      text: 'Optionnel : votre courriel est stocké séparément des autres données et ne sera utilisé que pour vous informer des suites de l\'étude.',
      type: 'mail',
      name: 'mail',
    },

  ]

  return (
    <div className='ui container'>
      <Message title={<h3>Collecte des données personnelles</h3>}>
        <p>
          Étant accessible par tout le monde, les votes collectés sur cette plateforme comportent des biais. Nous souhaitons mesurer ces biais en collectant des informations personnelles et en les comparant avec les résultats obtenus dans nos sondages réalisés avec Opinion Way.{' '}
          <Link href='/faq'><span className='ui lien'>Plus de détails.</span></Link>
        </p>
      </Message>

      {error && <ErrorToast msg={error} />}

      <form className="ui form">
        {fields.map((f, i) => <Field key={i} onChange={handleChange} {...f} />)}
        <br />
        <br />
        <div className='row'>
          <div onClick={handleSubmit} className="fluid ui  button">Valider</div>
        </div>
      </form>

    </div >
  )
}

export default Form
