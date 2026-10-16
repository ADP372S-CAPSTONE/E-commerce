import { Link } from 'react-router-dom'
import Reveal from '../motion/reveal/Reveal.jsx'
import StaggerGroup from '../motion/stagger-group/StaggerGroup.jsx'
import StaggerItem from '../motion/stagger-item/StaggerItem.jsx'
import { categories } from '../../constants/catalog/catalogOptions.js'
import { categoryImages } from '../../constants/assets/storeAssets.js'
import { label } from '../../utils/format/formatters.js'

export default function HomeCategories({ products = [] }) {
  const countFor = (category) => products.filter((product) => product.category === category).length
  return (
    <section className="section category-section">
      <Reveal className="section__heading"><h2>Shop by category</h2><Link to="/catalog">View all categories</Link></Reveal>
      <StaggerGroup className="category-grid">
        {categories.map((category) => {
          const count = countFor(category)
          return (
            <StaggerItem key={category}>
              <Link className="category-card" to={`/catalog?category=${category}`} aria-label={`Shop ${label(category)}`}>
                <img src={categoryImages[category]} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <h3>{label(category)}</h3>
                <small>{count > 0 ? `${count} ${count === 1 ? 'product' : 'products'}` : 'Explore'}</small>
              </Link>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
