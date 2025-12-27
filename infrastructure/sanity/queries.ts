export const QUERIES = {
  // User queries
  USER_BY_ID: `*[_type == "user" && _id == $id][0]{
    "id": _id,
    clerkUserId,
    "username": username.current,
    email,
    role,
    "avatarUrl": avatarUrl.asset->url,
    createdAt
  }`,

  USER_BY_CLERK_ID: `*[_type == "user" && clerkUserId == $clerkUserId][0]{
    "id": _id,
    clerkUserId,
    "username": username.current,
    email,
    role,
    "avatarUrl": avatarUrl.asset->url,
    createdAt
  }`,

  USER_BY_USERNAME: `*[_type == "user" && username.current == $username][0]{
    "id": _id,
    clerkUserId,
    "username": username.current,
    email,
    role,
    "avatarUrl": avatarUrl.asset->url,
    createdAt
  }`,

  // Property queries
  PROPERTIES_ALL: `*[_type == "property" && status == $status] | order(createdAt desc) {
    "id": _id,
    "ownerId": ownerId->_id,
    "owner": ownerId->{
      "id": _id,
      "username": username.current,
      "avatarUrl": avatarUrl.asset->url
    },
    title,
    "slug": slug.current,
    description,
    price,
    currency,
    location,
    acquisitionType,
    status,
    "coverImageUrl": coverImageUrl.asset->url,
    "galleryUrls": galleryUrls[].asset->url,
    createdAt,
    updatedAt
  }`,

  PROPERTY_BY_SLUG: `*[_type == "property" && slug.current == $slug][0]{
    "id": _id,
    "ownerId": ownerId->_id,
    "owner": ownerId->{
      "id": _id,
      "username": username.current,
      email,
      "avatarUrl": avatarUrl.asset->url
    },
    title,
    "slug": slug.current,
    description,
    price,
    currency,
    location,
    acquisitionType,
    status,
    "coverImageUrl": coverImageUrl.asset->url,
    "galleryUrls": galleryUrls[].asset->url,
    createdAt,
    updatedAt
  }`,

  PROPERTIES_BY_OWNER: `*[_type == "property" && ownerId._ref == $ownerId && status == $status] | order(createdAt desc) {
    "id": _id,
    "ownerId": ownerId->_id,
    title,
    "slug": slug.current,
    description,
    price,
    currency,
    location,
    acquisitionType,
    status,
    "coverImageUrl": coverImageUrl.asset->url,
    createdAt,
    updatedAt
  }`,

  // Advanced Content queries
  CONTENT_BY_PROPERTY: `*[_type == "advancedContent" && propertyId._ref == $propertyId] | order(createdAt asc) {
    "id": _id,
    "propertyId": propertyId->_id,
    "tag": tag.current,
    title,
    description,
    videoUrl,
    durationSeconds,
    price,
    currency,
    isBundle,
    createdAt
  }`,

  CONTENT_BY_TAG: `*[_type == "advancedContent" && propertyId._ref == $propertyId && tag.current == $_tag][0]{
    "id": _id,
    "propertyId": propertyId->_id,
    "tag": tag.current,
    title,
    description,
    videoUrl,
    durationSeconds,
    price,
    currency,
    isBundle,
    createdAt
  }`,

  // View Access queries
  VIEW_ACCESS_CHECK: `*[_type == "viewAccess" && userId._ref == $userId && contentId._ref == $contentId][0]{
    "id": _id,
    viewCount,
    maxViews,
    expiresAt
  }`,

  VIEW_ACCESS_BY_USER: `*[_type == "viewAccess" && userId._ref == $userId] | order(createdAt desc) {
    "id": _id,
    "userId": userId->_id,
    "contentId": contentId->_id,
    "content": contentId->{
      "id": _id,
      title,
      "tag": tag.current,
      "property": propertyId->{
        "id": _id,
        title,
        "slug": slug.current
      }
    },
    viewCount,
    maxViews,
    expiresAt,
    createdAt
  }`,

  // Payment queries
  PAYMENT_BY_ID: `*[_type == "payment" && _id == $id][0]{
    "id": _id,
    "userId": userId->_id,
    amount,
    currency,
    provider,
    providerRef,
    status,
    createdAt
  }`,

  PAYMENTS_BY_USER: `*[_type == "payment" && userId._ref == $userId] | order(createdAt desc) {
    "id": _id,
    "userId": userId->_id,
    amount,
    currency,
    provider,
    providerRef,
    status,
    createdAt
  }`,
}