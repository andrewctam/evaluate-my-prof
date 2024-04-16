package com.andrewtam

class ProfileResponse(val totalVotes: Int, val totalReviews: Int, val reviews: List<Review>)
class OkResponse(val message: String)