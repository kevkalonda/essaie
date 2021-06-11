// npm install --save react-navigation
// npm install @react-navigation/native
// npm install @react-navigation/stack

import * as React from 'react';
import login_form from './components/connexion/connexionForm';
import sendMailConfirmation from './components/connexion/authentification';
import compteInexistant from './components/connexion/compteInexistant';
import login_form_inscription from './components/connexion/inscriptionForm';
import motDePasseOublie from './components/accueil/motDePasseOublie';
import accueil from './components/accueil/accueil';
import connexion from './components/accueil/connexionReussi';
import modeInscription from './components/connexion/acceuil_login_form';

import { createStackNavigator } from '@react-navigation/stack'

import app from './API/maps';
import app2 from './API/carte';
import latitudeLongitude from './API/latitudeLongitude';

import carte from './components/connecter/connecter.js';
import Proposer from './components/connecter/proposerCourse';
import Arrets from './components/connecter/Ajoutarrets';
import Recherche from './components/connecter/rechercheCovoiturages';
import RechercheSr from './components/connecter/rechercheSoiree';
import filtreRecherche from './components/connecter/filtre';


import Welcome from './components/tutoriel/welcome'

import Intro from './components/tutoriel/introduction'
import WelcomeP from './components/tutoriel/passager/welcome_p'
import ProfilP from './components/tutoriel/passager/profile_p'
import InfosP from './components/tutoriel/passager/infos_p'
import InfosP2 from './components/tutoriel/passager/infos_p2'
import PhotoP from './components/tutoriel/passager/photo_P'
import DescriptionP from './components/tutoriel/passager/Description/description_P'
import Description2_P from './components/tutoriel/passager/Description/description2_P'
import Description3_P from './components/tutoriel/passager/Description/description3_P'
import DescriptionP4 from './components/tutoriel/passager/Description/description4_P'
import Choose from './components/tutoriel/passager/Subscription/Choose'
import prixTrajet from './components/tutoriel/passager/Subscription/prixTrajet'
import Subscription from './components/tutoriel/passager/Subscription/Subscription'
import Subscription2 from './components/tutoriel/passager/Subscription/Subscription2'
import MeansPayement from './components/tutoriel/passager/Payement/MeansPayement'
import MeansPayement2 from './components/tutoriel/passager/Payement/MeansPayement2'
import MeansPayement3 from './components/tutoriel/passager/Payement/Payement'
import EndPay from './components/tutoriel/passager/Payement/EndPay'

import Cost from './components/tutoriel/passager/Subscription/Cost'
import WhatIsCoast from './components/tutoriel/passager/Subscription/WhatIsCoast'
import howAreCalcul from './components/tutoriel/passager/Subscription/howAreCalcul'
import BookingFee from './components/tutoriel/passager/Subscription/BookingFee'

import Infos from './components/tutoriel/passager/infos'
import PhotoP2 from './components/tutoriel/passager/profile/photo_p'
//import WelcomeB from './components/tutoriel/both/welcome_b'
import infoVoiture from './components/tutoriel/both/infoVoiture'
import smoke from './components/tutoriel/both/smoke'

import imagePermis from './components/tutoriel/both/imagePermi'
import welcomeBoth from './components/tutoriel/both/welcomeBoth'
import profilIdentite from './components/tutoriel/both/profilIdentite'
//import ProfilB from './components/tutoriel/both/profil_b'
import AccueilPro from './components/pro/acceuil_pro'

import Accueil_bars from './components/pro/bars/accueil_bar'
import Accueil_concert from './components/pro/concerts/accueil_concert'
import Accueil_ecole from './components/pro/scolaire/accueil_scolaire'
import Accueil_entreprise from './components/pro/entreprises/accueil_entreprise'

/*     
      <Stack.Screen name="carte" component={carte} />
      <Stack.Screen name="WelcomeB" component={WelcomeB} />
      <Stack.Screen name="ProfilB" component={ProfilB} />
 */


const Stack = createStackNavigator();

export default function Root() {
    return (
        <Stack.Navigator initialRouteName="Home">

            <Stack.Screen name="Home" component={accueil} />
            <Stack.Screen name="Connecter" component={connexion} />
            <Stack.Screen name="Authentification" component={sendMailConfirmation} />
            <Stack.Screen name="Application" component={modeInscription} />
            <Stack.Screen name="Compte inexistant" component={compteInexistant} />
            <Stack.Screen name="Inscription" component={login_form_inscription} />
            <Stack.Screen name="Connexion" component={login_form} />
            <Stack.Screen name="MotDePasseOublier" component={motDePasseOublie} />

            <Stack.Screen name="latitudeLongitude" component={latitudeLongitude} />
            <Stack.Screen name="app" component={app} />
            <Stack.Screen name="app2" component={app2} />

            
            <Stack.Screen name="carte" component={carte} />
            <Stack.Screen name="Proposition course" component={Proposer} />
            <Stack.Screen name="Ajouts arrets" component={Arrets} />
            <Stack.Screen name="Recherche covoit" component={Recherche} />
            <Stack.Screen name="Recherche soiree" component={RechercheSr} />
            <Stack.Screen name="filtre" component={filtreRecherche} />
            


            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Introduction" component={Intro} />
            <Stack.Screen name="WelcomeP" component={WelcomeP} />
            <Stack.Screen name="ProfilP" component={ProfilP} />
            <Stack.Screen name="Infos" component={Infos} />
            <Stack.Screen name="InfosP" component={InfosP} />
            <Stack.Screen name="InfosP2" component={InfosP2} />
            <Stack.Screen name="PhotoP" component={PhotoP} />


            <Stack.Screen name="DescriptionP" component={DescriptionP} />
            <Stack.Screen name="DescriptionP2" component={Description2_P} />
            <Stack.Screen name="DescriptionP3" component={Description3_P} />
            <Stack.Screen name="DescriptionP4" component={DescriptionP4} />

            <Stack.Screen name="Simulation Prix" component={prixTrajet} />
            <Stack.Screen name="Choose" component={Choose} />
            <Stack.Screen name="Subscription" component={Subscription} />
            <Stack.Screen name="Subscription2" component={Subscription2} />
            <Stack.Screen name="Cost" component={Cost} />
            <Stack.Screen name="Comment" component={howAreCalcul} />
            <Stack.Screen name="Booking" component={BookingFee} />
            <Stack.Screen name="Correspondance de frais" component={WhatIsCoast} />


            <Stack.Screen name="MeansPayement" component={MeansPayement} />
            <Stack.Screen name="MeansPayement2" component={MeansPayement2} />
            <Stack.Screen name="Payement" component={MeansPayement3} />
            <Stack.Screen name="EndPay" component={EndPay} />

            <Stack.Screen name="PhotoP2" component={PhotoP2} />
            
            <Stack.Screen name="Vehicule" component={infoVoiture} />
            <Stack.Screen name="Smoke" component={smoke} />
            <Stack.Screen name="Carte Identite" component={profilIdentite} />
            <Stack.Screen name="Permis" component={imagePermis} />
            <Stack.Screen name="Bienvenue Conducteur" component={welcomeBoth} />

            <Stack.Screen name="AccueilPro" component={AccueilPro} />
            <Stack.Screen name="Accueil_bars" component={Accueil_bars} />
            <Stack.Screen name="Accueil_ecole" component={Accueil_ecole} />
            <Stack.Screen name="Accueil_concert" component={Accueil_concert} />
            <Stack.Screen name="Accueil_entreprise" component={Accueil_entreprise} />

        </Stack.Navigator>
    );
}