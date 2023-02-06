package expo.community.modules.googleplacesautocomplete

import expo.modules.kotlin.exception.CodedException

class FailedToFetchPlace(message: String?) :
    CodedException(message)

class FailedToFetchDetails(message: String?) :
    CodedException(message)