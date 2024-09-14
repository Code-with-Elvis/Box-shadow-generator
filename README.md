### Box Shadow Generator

- Welcome to the Box Shadow Generator! This interactive tool allows users to create and customize box shadows for their web elements effortlessly. With adjustable parameters like horizontal and vertical lengths, blur radius, spread radius, opacity, colors, and inset options, you can visualize the shadow effects in real-time. Simply input your desired values, and watch as the changes are reflected immediately.

### More info

#### CustomFetch

```ts
import axios from 'axios'

const productionUrl = 'https://strapi-store-server.onrender.com/api'

export const customFetch = axios.create({
  baseURL: productionUrl,
})
```

#### Products Types

- create **`utils/types.ts`** and setup export

```ts
export type ProductsResponse = {
  data: Product[]
  meta: ProductsMeta
}

export type Product = {
  id: number
  attributes: {
    category: string
    company: string
    createdAt: string
    description: string
    featured: boolean
    image: string
    price: string
    publishedAt: string
    shipping: boolean
    title: string
    updatedAt: string
    colors: string[]
  }
}

export type ProductsMeta = {
  categories: string[]
  companies: string[]
  pagination: Pagination
}

export type Pagination = {
  page: number
  pageCount: number
  pageSize: number
  total: number
}
```

#### Landing Loader

```tsx
import { FeaturedProducts, Hero } from '@/components'
import { customFetch, type ProductsResponse } from '@/utils'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'

const url = '/products?featured=true'

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url)
  return { ...response.data }
}

function Landing() {
  const result = useLoaderData() as ProductsResponse
  console.log(result)

  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}
export default Landing
```

##### Using React Query

- To replace the useLoaderData and LoaderFunction with React Query, you can set up a query to fetch your featured products directly within the Landing component. Here’s how you can modify your code:

```js
import { FeaturedProducts, Hero } from '@/components';
import { customFetch, type ProductsResponse } from '@/utils';
import { useQuery } from '@tanstack/react-query';

const url = '/products?featured=true';

function Landing() {
  const { data: result, isLoading, error } = useQuery<ProductsResponse, Error>(['featuredProducts'], async () => {
    const response = await customFetch<ProductsResponse>(url);
    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(result);

  return (
    <>
      <Hero />
      <FeaturedProducts products={result} />
    </>
  );
}

export default Landing;
```

App.tsx

```tsx
{
  index: true,
  element: <Landing />,
  loader: landingLoader,
  errorElement: <ErrorElement />,
},
```

#### Format Price

```ts
export const formatAsDollars = (price: string | number): string => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price) / 100)
  return dollarsAmount
}
```

#### ProductsGrid

```tsx
import { Link, useLoaderData } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { formatAsDollars, ProductsResponse } from '@/utils'
const ProductsGrid = () => {
  const { data: products } = useLoaderData() as ProductsResponse

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {products.map((product) => {
        const { title, price, image } = product.attributes
        const dollarsAmount = formatAsDollars(price)

        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card>
              <CardContent className="p-4">
                <img
                  src={image}
                  alt={title}
                  className="rounded-md h-64 md:h-48 w-full object-cover"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold capitalize">{title}</h2>
                  <p className="text-primary font-light mt-2">
                    {dollarsAmount}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
export default ProductsGrid
```

#### Products Page

- don't forget to import and setup loader in the App.tsx

```tsx
import { Filters, ProductsContainer, PaginationContainer } from '@/components'
import { customFetch, type ProductsResponse } from '../utils'
import { type LoaderFunction } from 'react-router-dom'

const url = '/products'

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url)

  return { ...response.data }
}
```

#### Products Loader

```tsx
export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponse> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  const response = await customFetch<ProductsResponse>(url, { params })
  console.log(response.data)

  return { ...response.data, params }
}
```

new URL(request.url) creates a new URL object from the URL in the request. .searchParams.entries() gets an iterator for entries in the query parameters, where each entry is an array of [key, value].

... is the spread operator, which expands the entries into individual elements. Object.fromEntries([...]) converts these entries back into an object, where each key-value pair becomes a property in the object.

So, if your URL is (http://example.com?param1=value1&param2=value2), the resulting params object would be { param1: 'value1', param2: 'value2' }.

##### Using React Query

- To convert the loader function that uses request and query parameters to React Query, you can extract the search parameters directly in the Landing component. This way, you can maintain the functionality of fetching data based on query parameters. Here’s how to do it:

```tsx
import { FeaturedProducts, Hero } from '@/components'
import { customFetch, type ProductsResponse } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

function Landing() {
  const { search } = useLocation() // Get the search params from the URL
  const params = Object.fromEntries(new URLSearchParams(search)) // Convert search params to an object

  const {
    data: result,
    isLoading,
    error,
  } = useQuery<ProductsResponse, Error>(
    ['featuredProducts', params], // Use params as part of the query key to refetch on change
    async () => {
      const response = await customFetch<ProductsResponse>('/products', {
        params,
      })
      return response.data
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(result)

  return (
    <>
      <Hero />
      <FeaturedProducts products={result} />
    </>
  )
}

export default Landing
```

#### Setup Params Type

utils/types.ts

```ts
export type Params = {
  search?: string
  category?: string
  company?: string
  order?: string
  price?: string
  shipping?: string
  page?: number
}

export type ProductsResponseWithParams = ProductsResponse & { params: Params }
```

#### Implement Params

- in Products setup loader return : Response

Filters.tsx

```tsx
import { type ProductsResponseWithParams } from '@/utils'
function Filters() {
  const { meta, params } = useLoaderData() as ProductsResponseWithParams
  const { search } = params
  return (
    <Form>
      <div>
        <Label htmlFor="search">Search Product</Label>
        <Input id="search" name="search" type="text" defaultValue={search} />
      </div>
    </Form>
  )
}
export default Filters
```

#### CartItem and CartState Types

utils/types.ts

```ts
export type CartItem = {
  cartID: string
  productID: number
  image: string
  title: string
  price: string
  amount: number
  productColor: string
  company: string
}

export type CartState = {
  cartItems: CartItem[]
  numItemsInCart: number
  cartTotal: number
  shipping: number
  tax: number
  orderTotal: number
}
```

#### CartSlice

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type CartItem, type CartState } from '@/utils'
import { toast } from '@/components/ui/use-toast'

const defaultState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
}

const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : defaultState
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload
      const item = state.cartItems.find((i) => i.cartID === newCartItem.cartID)
      if (item) {
        item.amount += newCartItem.amount
      } else {
        state.cartItems.push(newCartItem)
      }
      state.numItemsInCart += newCartItem.amount
      state.cartTotal += Number(newCartItem.price) * newCartItem.amount
      // state.tax = 0.1 * state.cartTotal;
      // state.orderTotal = state.cartTotal + state.shipping + state.tax;
      // localStorage.setItem('cart', JSON.stringify(state));
      cartSlice.caseReducers.calculateTotals(state)
      toast({ description: 'Item added to cart' })
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState))
      return defaultState
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cartID = action.payload
      const cartItem = state.cartItems.find((i) => i.cartID === cartID)
      if (!cartItem) return
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID)
      state.numItemsInCart -= cartItem.amount
      state.cartTotal -= Number(cartItem.price) * cartItem.amount
      cartSlice.caseReducers.calculateTotals(state)
      toast({ description: 'Item removed from the cart' })
    },
    editItem: (
      state,
      action: PayloadAction<{ cartID: string; amount: number }>
    ) => {
      const { cartID, amount } = action.payload
      const cartItem = state.cartItems.find((i) => i.cartID === cartID)
      if (!cartItem) return

      state.numItemsInCart += amount - cartItem.amount
      state.cartTotal += Number(cartItem.price) * (amount - cartItem.amount)
      cartItem.amount = amount
      cartSlice.caseReducers.calculateTotals(state)
      toast({ description: 'Amount updated' })
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions
export default cartSlice.reducer
```

#### SingleProduct - AddItem

```tsx
import { type CartItem } from '@/utils'
import { useAppDispatch } from '@/hooks'
import { addItem } from '@/features/cart/cartSlice'

const dispatch = useAppDispatch()

const cartProduct: CartItem = {
  cartID: product.id + productColor,
  productID: product.id,
  image,
  title,
  price,
  amount,
  productColor,
  company,
}

const addToCart = () => {
  dispatch(addItem(cartProduct))
}
```

#### UserSlice

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from '@/components/ui/use-toast'

export type User = {
  username: string
  jwt: string
}

type UserState = {
  user: User | null
}

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem('user')
  if (!user) return null
  return JSON.parse(user)
}

const initialState: UserState = {
  user: getUserFromLocalStorage(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))

      if (user.username === 'demo user') {
        toast({ description: 'Welcome Guest User' })
        return
      }
      toast({ description: 'Login successful' })
    },
    logoutUser: (state) => {
      state.user = null
      // localStorage.clear()
      localStorage.removeItem('user')
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer
```

#### Guest User

```ts
const dispatch = useAppDispatch()
const navigate = useNavigate()
const loginAsGuestUser = async (): Promise<void> => {
  try {
    const response = await customFetch.post('/auth/local', {
      identifier: 'test@test.com',
      password: 'secret',
    })
    const username = response.data.user.username
    const jwt = response.data.jwt
    dispatch(loginUser({ username, jwt }))
    navigate('/')
  } catch (error) {
    console.log(error)
    toast({ description: 'Login Failed' })
  }
}
```

#### Login Request

App.tsx

```tsx
import { action as loginAction } from './pages/Login';
import { store } from './store';

{
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
```

Login.tsx

```tsx
export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      const response: AxiosResponse = await customFetch.post(
        '/auth/local',
        data
      )
      const username = response.data.user.username
      const jwt = response.data.jwt
      store.dispatch(loginUser({ username, jwt }))
      return redirect('/')
    } catch (error) {
      // console.log(error);
      toast({ description: 'Login Failed' })
      return null
    }
  }
```

##### useMutation

```ts
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { customFetch } from '@/utils' // Assuming customFetch is your axios instance
import { loginUser } from '@/features/User/userSlice' // Redux action for logging in the user
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function useLoginAction() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const mutation = useMutation(
    async (formData: FormData) => {
      const data = Object.fromEntries(formData) // Convert FormData to an object
      const response = await customFetch.post('/auth/local', data) // Perform login request
      return response.data
    },
    {
      onSuccess: (data) => {
        const username = data.user.username
        const jwt = data.jwt
        dispatch(loginUser({ username, jwt })) // Dispatch login action to Redux store
        toast.success('Login successful!')
        navigate('/') // Redirect to home page on success
      },
      onError: () => {
        toast.error('Login failed. Please try again.') // Show error toast
      },
    }
  )

  return mutation
}

export default useLoginAction
```
