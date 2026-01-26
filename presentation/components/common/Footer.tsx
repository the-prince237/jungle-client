import Link from 'next/link'
import Logo from '../logo'

export const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 py-12 mt-12">
      <div className="container mx-auto">
        <div className="grid w-full padded-x grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo variant='footer' />
          </div>

          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
              <li><Link href="/search" className="hover:text-primary">Rechercher</Link></li>
              <li><Link href="/new" className="hover:text-primary">Publier une annonce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Aide</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/support" className="hover:text-primary">Support</Link></li>
              <li><Link href="/support#faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📧 contact@jungle.immo</li>
              <li>📞 +237 673 080 527</li>
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
