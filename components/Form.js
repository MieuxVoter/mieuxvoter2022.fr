import Link from 'next/link'
import ErrorToast from './Toast'
import {candidates} from '../lib/constants'


const Field = ({type, text, options, onClick, name}) => {
  let Component = null

  if (type == 'mail') {
    Component = (<div class="ui input">
      <input type="email" onClick={onClick} name={name} />
    </div>)
  } else if (type == 'mail') {
    Component = (
      <div class="field">
        <div class="ui radio checkbox">
          {options.map((opt, i) => <><input key={i} type="radio" name={name} /><label>{opt}</label></>)}
        </div>
      </div>)
  } else {
    throw 'Not implemented'
  }

  return (<div className='ui row'>
    <label>{text}</label>
    <Component />
  </div>)
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
    return data.zipCode !== ""
  }

  const handleChange = (e, target) => {
    let {name, value, checked} = target
    if (checked !== undefined) {
      value = checked
    }
    console.log(data)
    console.log(target, value, name)

    setData({
      [name]: value,
    })
  }

  const handleSubmit = () => {
    if (!this.check()) {
      setError('Veuillez juger tous les candidats.')
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
      name: 'genre',
    },
    {
      text: 'Vous venez de voter au scrutin par jugement majoritaire. A l’avenir, seriez-vous favorable ou défavorable à l’application de ce mode de scrutin pour l’élection présidentielle en France?',
      type: 'radio',
      options: ['Tout-à-fait favorable', 'Plutôt favorable', 'Plutôt défavorable', 'Tout-à-fait défavorable'],
      name: 'appreciation',
    },
    {
      text: 'Si vous souhaitez être informé·e des résultats de notre expérience, ajoutez votre courriel. Nous ne vous contacterons pour aucun autre motif.',
      type: 'mail',
      name: 'mail',
    },

  ]

  return (
    <div className='ui container'>
      <Message title={<h3>Collection des informations personnels</h3>}>
        <p>
          Étant accessible par tout le monde, les votes collectés sur cette plateforme comporte des biais. Nous souhaitons mesurer ces biais en collectant des informations personnels et en les comparant avec les résultats obtenus dans nos sondages réalisés avec Opinion Way.
          <Link href='/faq'><span className='ui link'>Plus de détails</span></Link>
        </p>
      </Message>

      {error && <ErrorToast msg={error} />}

      <form class="ui form">
        <div class="field">
          {fields.map(f => <Field {...f} />)}
          <div className='row'>
            <div onClick={handleSubmit} className={`fluid ui ${isDone ? '' : 'disabled'} button`}>Je vote</div>
          </div>
        </div>
      </form>

    </div >
  )
}

export default Form
