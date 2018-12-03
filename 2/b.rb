input = File.read("input")
identifiers = input.split("\n")
frequencies = []

identifiers.each_with_index do |id1, i|
  for i2 in (i + 1..identifiers.length - 1)
    id2 = identifiers[i2]
    diff = nil
    id1.split("").each_with_index do |char,i|
      if char != id2[i]
        break unless diff.nil?
        diff = char
      end
      puts id1, id2, diff if i == 25
    end
  end
end
