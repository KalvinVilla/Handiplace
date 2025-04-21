import Header from '~/components/header.js'

export default function RequestPage() {
  return (
    <>
      <Header />
      <h1>Faire une nouvelle demandes</h1>
      <form className="flex flex-col" method="post" action="/requests">
        <label htmlFor="name">Nom de l'endroit</label>
        <input required type="text" name="name" id="name" />
        <label htmlFor="accessRamp">Rampe d'accés</label>
        <input required type="checkbox" name="accessRamp" id="accessRamp" />
        <label htmlFor="elevator">Ascenseur</label>
        <input required type="checkbox" name="elevator" id="elevator" />
        <label htmlFor="parking">Parking</label>
        <input required type="checkbox" name="parking" id="parking" />
        <label htmlFor="website">Site web</label>
        <input type="text" name="website" id="website" />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description"></textarea>
        <div className="flex">
          <label htmlFor="address">Adresse</label>
          <input required type="text" name="address" id="address" />
          <label htmlFor="city">Ville</label>
          <input type="text" name="city" id="city" />
          <label htmlFor="postalCode">Code postal</label>
          <input type="text" name="postalCode" id="postalCode" />
          <label htmlFor="country">Pays</label>
          <input type="text" name="country" id="country" />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </>
  )
}
