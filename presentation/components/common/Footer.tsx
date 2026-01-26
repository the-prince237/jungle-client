import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Jungle</h3>
            <p className="text-sm text-gray-600">
              La plateforme immobilière de confiance au Cameroun
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-blue-600">Accueil</Link></li>
              <li><Link href="/search" className="hover:text-blue-600">Rechercher</Link></li>
              <li><Link href="/new" className="hover:text-blue-600">Publier une annonce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Aide</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/support" className="hover:text-blue-600">Support</Link></li>
              <li><Link href="/support#faq" className="hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📧 support@realestatepro.cm</li>
              <li>📞 +237 6XX XX XX XX</li>
              <li>📍 Yaoundé, Cameroun</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Jungle - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}
