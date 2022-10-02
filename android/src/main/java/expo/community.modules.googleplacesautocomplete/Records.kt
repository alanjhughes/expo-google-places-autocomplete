package expo.community.modules.googleplacesautocomplete

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

internal class RequestConfig : Record {
    @Field
    var countries: List<String> = emptyList()
}




