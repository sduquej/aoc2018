input = File.read("input")
identifiers = input.split("\n")
twos = 0
threes = 0
identifiers.each do |id|
  frequency_map = id.split("").each_with_object(Hash.new(0)) do |key,hash|
    hash[key] += 1
  end
  unique_frequencies = frequency_map.values.uniq
  twos += 1 if unique_frequencies.include?(2)
  threes += 1 if unique_frequencies.include?(3)
end
puts twos * threes
