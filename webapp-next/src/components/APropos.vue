<template>
  <v-container id="apropos">
    <h1>A propos</h1>

    <p><a href="https://www.supercinebattle.fr/">Super Ciné Battle</a> est un podcast de Daniel Andreyev et Stéphane
      Bouley, visant à établir le classement ultime du cinéma.</p>

    <p><i>Super Ciné Marbre</i> n'est pas affilié à Super Ciné Battle. Nous ne sommes que des fans visant à diffuser
      humblement le savoir du marbre au plus grand nombre.</p>

    <h3>L'équipe</h3>

    <ul>
      <li>520STB : maintien à jour des épisodes, films et timestamps</li>
      <li>Wan : développement du site</li>
    </ul>

    <h3>Nous contacter</h3>

    <ul>
      <li>Pour remonter des erreurs ou des suggestions de fonctionnalités, contacter Wan sur Discord
        (<code>Wan#2191</code>) ou Twitter (<a href="https://twitter.com/mkalamalami">@mkalamalami</a>), ou mieux encore
        créer une <a href="https://github.com/supercinemarbre/supercinemarbre.github.io">issue sur Github</a>.</li>
      <li>Pour contribuer des timestamps et classements de films, contacter 520STB sur Discord
        (<code>520STB#8015</code>).</li>
      <li>Si vous savez des connaissances en programmation (TypeScript
      et/ou Vue), <a href="https://github.com/supercinemarbre/supercinemarbre.github.io">viendez contribuer sur
        Github</a> !</li>
    </ul>

    <h3>Licences</h3>

    <h4>Données</h4>

    <ul>
      <li><a href="https://docs.google.com/spreadsheets/d/1_h4Yh9xU72iqH3gZI6OquYG-jfBYPP4d1k-T9jwxEq8/edit#gid=1591523541">Google Docs du Discord SCB</a> gérée et maintenue par 520STB, avec des contributions de Quentin Haroche, Cellcious, wallydbecharef, et d'autres.</li>
      <li>Utilise des données de <a href="http://www.omdbapi.com/">OMDB</a> sous licence CC BY-NC 4.0.</li>
      <li>Information courtesy of IMDb (http://www.imdb.com). Used with permission.</li>
      <li>This product uses the <a href="https://www.themoviedb.org"><img id="tmdblogo" alt="TMDB Logo"
            src="../../public/img/tmdb_blue_short.svg"></a> API but is not endorsed or certified by TMDb.</li>
      <li>Sans oublier <a href="http://supercinebattle.fr/">Les Listes</a>.</li>
    </ul>

    <h4>Images</h4>

    <ul>
      <li><a href="https://icons8.com/icons/set/imdb">IMDb icon</a> icon by <a href="https://icons8.com">Icons8</a></li>
      <li><a href="https://icons8.com/icons/set/tomato">Tomato icon</a> icon by <a href="https://icons8.com">Icons8</a>
      </li>
      <li><a href="https://icons8.com/icons/set/rotten-tomatoes">Rotten Tomatoes icon</a> icon by <a
          href="https://icons8.com">Icons8</a></li>
      <li><a href="https://www.pexels.com/fr-fr/photo/bille-gris-marbre-mur-2824173/">Texture de marbre</a> par <a
          href="https://www.pexels.com/fr-fr/@scottwebb">Scott Web</a> sous licence CC-0</li>
      <li><a href="https://www.justwatch.com/fr/presse">Logo JustWatch</a> issu de leur kit de presse</li>
      <li><a href="https://www.themoviedb.org/about/logos-attribution">Logo TMDB</a> issu de leur FAQ conformément aux
        "terms of use" de <a href="https://www.themoviedb.org/">themoviedb.org</a></li>
      <li>Logo de chaînes TV issus de <a href="https://fr.wikipedia.org">Wikipédia</a>, reproduits en vertu des droits
        accordés par les articles L711-1 et suivants du Code de la propriété intellectuelle.</li>
    </ul>
  </v-container>

</template>

<style lang="scss">
#apropos {
  max-width: 1024px;
}

#tmdblogo {
  width: 100px;
  height: 12px;
}

h2,
h3 {
  margin: 30px 0 10px 0;
}

ul {
  margin-bottom: 20px;
}

li {
  margin-left: 20px;
}
</style>